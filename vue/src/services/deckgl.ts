/* eslint-disable */
/* @ts-ignore */
import { Deck, DeckglOptions, ViewState } from '@deck.gl/core'
import { LngLatLike, Map, MapboxOptions } from 'mapbox-gl'
import { Container, Service } from 'typedi'

import { deckgl } from '@/config'
import { StaticStates } from '@/enums'
import { IDeckglOptions, IDeckglViewSettings } from '@/interfaces'
import { StateService } from '@/services'

@Service()
export default class DeckglService {
  private _options: IDeckglOptions = deckgl.options
  private _staticStates: Record<string, string> = StaticStates

  constructor(private _deck: Deck, private _map: Map, private _stateService: StateService) {
    this._stateService = Container.get(StateService)
  }

  get deck(): Deck {
    return this._deck
  }

  get map(): Map {
    return this._map
  }

  private get _state(): IDeckglViewSettings {
    const { DECKGL_VIEW_SETTINGS } = this._staticStates
    return <IDeckglViewSettings>this._stateService.getStaticState(DECKGL_VIEW_SETTINGS)
  }

  private set _state(settings: IDeckglViewSettings) {
    const { DECKGL_VIEW_SETTINGS } = this._staticStates
    this._stateService.setStaticState(DECKGL_VIEW_SETTINGS, settings)
  }

  loadDeckgl(): void {
    const { canvas, controller, id, maxPitch, maxZoom, minZoom } = this._options
    const options: DeckglOptions = {
      canvas,
      controller,
      id,
      initialViewState: { maxPitch, maxZoom, minZoom, ...this._state }
    }
    this._deck = new Deck({
      ...options,
      onViewStateChange: ({ viewState: { bearing, latitude, longitude, pitch, zoom } }: ViewState): void => {
        const center: LngLatLike = { lng: longitude, lat: latitude }
        const state: IDeckglViewSettings = { bearing, center, latitude, longitude, pitch, zoom }
        this.setDeckglViewSettingsState(state)
        this.mapJumpTo()
      },
      getTooltip: ({ object }: Record<string, any>): string | null => {
        if (!object) return null
        const { points }: Record<string, []> = object
        return `${points.length} Accidents`
      }
    })
  }

  loadMapbox(): void {
    const { container, interactive, style } = this._options
    const options: MapboxOptions = { container, interactive, style, ...this._state }
    this._map = new Map(options)
  }

  removeDeckInstance(): void {
    this._deck.finalize()
  }

  removeMapInstance(): void {
    this._map.remove()
  }

  private mapJumpTo(): void {
    this._map.jumpTo(this._state)
  }

  private setDeckglViewSettingsState(state: IDeckglViewSettings): void {
    this._state = state
  }
}
