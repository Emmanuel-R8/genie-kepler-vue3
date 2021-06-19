/* eslint-disable */
/* @ts-ignore */
import { Deck, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions, SkyLayer } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import { States } from '@/enums'
import { IDeckglOptions, IDeckglViewSettings } from '@/interfaces'
import { ModalService, StoreService } from '@/services'

@Service()
export default class DeckService {
  private _options: IDeckglOptions = deckgl.options
  private _skyLayer = <SkyLayer>deckgl.skyLayer
  private _states: Record<string, string> = States

  constructor(
    private _deck: Deck,
    private _map: Map,
    private _modalService: ModalService,
    private _storeService: StoreService
  ) {
    this._modalService = Container.get(ModalService)
    this._storeService = Container.get(StoreService)
  }

  get deck(): Deck {
    return this._deck
  }

  get map(): Map {
    return this._map
  }

  private get _state(): IDeckglViewSettings {
    const { DECKGL_VIEW_SETTINGS } = this._states
    return <IDeckglViewSettings>this._storeService.getState(DECKGL_VIEW_SETTINGS)
  }

  private set _state(settings: IDeckglViewSettings) {
    const { DECKGL_VIEW_SETTINGS } = this._states
    this._storeService.setState(DECKGL_VIEW_SETTINGS, settings)
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
    this.addSkyLayer()
    this.hideModal()
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
        const center: LngLatLike = [longitude, latitude]
        this._state = { bearing, center, latitude, longitude, pitch, zoom }
        this._map.jumpTo(this._state)
      },
      getTooltip: ({ object }: Record<string, any>): string | null => {
        if (!object) return null
        const { points } = object
        return `${points.length} Accidents`
      }
    })
  }

  private addSkyLayer(): void {
    this._map.addLayer(this._skyLayer)
  }

  private hideModal(): void {
    this._modalService.hideModal(400)
  }
}
