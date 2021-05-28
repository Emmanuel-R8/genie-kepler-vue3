/* @ts-ignore */
import { Deck, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import { StoreStates } from '@/enums'
import { IDeckglOptions, IDeckglViewSettings } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class DeckService {
  private _DECKGL_VIEW_SETTINGS = StoreStates.DECKGL_VIEW_SETTINGS
  private _options: IDeckglOptions = deckgl.options
  private _settings: IDeckglViewSettings = deckgl.settings
  private _skyLayer: SkyLayer = deckgl.skyLayer as SkyLayer

  constructor(private _deck: Deck, private _map: Map, private _storeService: StoreService) {
    this._storeService = Container.get(StoreService)
  }

  get deck(): Deck {
    return this._deck
  }

  get map(): Map {
    return this._map
  }

  loadMapbox(): void {
    this._settings = this._storeService.getState(this._DECKGL_VIEW_SETTINGS)
    const options: MapboxOptions = { ...this._options, ...this._settings }
    this._map = new Map(options)
    this._map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler = (): void => {
    this._map.addLayer(this._skyLayer)
  }

  loadDeckgl(): void {
    const { canvas, controller } = this._options
    this._deck = new Deck({
      canvas,
      controller,
      initialViewState: this._storeService.getState(this._DECKGL_VIEW_SETTINGS),
      onViewStateChange: ({
        viewState,
        viewState: { bearing, latitude, longitude, pitch, zoom }
      }: ViewState): void => {
        this.setDeckglViewSettingsState(viewState)
        this._map.jumpTo({
          bearing,
          center: { lng: longitude, lat: latitude },
          pitch,
          zoom
        })
      },
      getTooltip: ({ object }: Record<string, any>): string | null => {
        if (!object) {
          return null
        }
        const { points } = object
        return `${points.length} Accidents`
      }
    })
  }

  private setDeckglViewSettingsState({
    bearing,
    latitude,
    longitude,
    pitch,
    zoom
  }: ViewState): void {
    latitude = +latitude.toFixed(6)
    longitude = +longitude.toFixed(6)
    const center: LngLatLike = { lng: longitude, lat: latitude }
    const settings: IDeckglViewSettings = {
      bearing: +bearing.toFixed(1),
      center,
      latitude,
      longitude,
      pitch: +pitch.toFixed(1),
      zoom: +zoom.toFixed(2)
    }
    this._storeService.setState(this._DECKGL_VIEW_SETTINGS, settings)
  }
}
