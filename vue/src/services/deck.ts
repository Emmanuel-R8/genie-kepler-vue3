/* @ts-ignore */
import { Deck, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import { States } from '@/enums'
import { IDeckglOptions, IDeckglViewSettings } from '@/interfaces'
import { StoreService } from '@/services'

@Service()
export default class DeckService {
  private _DECKGL_VIEW_SETTINGS = States.DECKGL_VIEW_SETTINGS
  private _options: IDeckglOptions = deckgl.options
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
  private get _state(): IDeckglViewSettings {
    return this._storeService.getState(this._DECKGL_VIEW_SETTINGS)
  }
  private set _state(settings: IDeckglViewSettings) {
    this._storeService.setState(this._DECKGL_VIEW_SETTINGS, settings)
  }

  loadMapbox(): void {
    const { container, interactive, style } = this._options
    const options: MapboxOptions = { container, interactive, style, ...this._state }
    this._map = new Map(options)
    this._map.on('load', (): void => {
      this.onMapLoadHandler()
    })
  }

  onMapLoadHandler(): void {
    this._map.addLayer(this._skyLayer)
  }

  loadDeckgl(): void {
    const { canvas, controller, maxPitch, maxZoom, minZoom } = this._options
    this._deck = new Deck({
      canvas,
      controller,
      initialViewState: {
        maxPitch,
        maxZoom,
        minZoom,
        ...this._state
      },
      onViewStateChange: ({
        viewState: { bearing, latitude, longitude, pitch, zoom }
      }: ViewState): void => {
        const center: LngLatLike = { lng: longitude, lat: latitude }
        const settings: IDeckglViewSettings = { bearing, center, latitude, longitude, pitch, zoom }
        this.setDeckglViewSettingsState(settings)
        this._map.jumpTo({ bearing, center, pitch, zoom })
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
    center,
    latitude,
    longitude,
    pitch,
    zoom
  }: IDeckglViewSettings): void {
    latitude = +latitude.toFixed(6)
    longitude = +longitude.toFixed(6)
    center = { lng: longitude, lat: latitude }
    this._state = {
      bearing: +bearing.toFixed(2),
      center,
      latitude,
      longitude,
      pitch: +pitch.toFixed(2),
      zoom: +zoom.toFixed(2)
    }
  }
}
