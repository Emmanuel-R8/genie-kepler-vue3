import { Container } from 'typedi'
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted } from 'vue'

// Import all relevant interfaces
import { ITemplate_Settings, ITemplate_StaticProps, ITemplate_ReactiveProps } from '@/interfaces'

/* eslint-disable-next-line */
import localstaticimage from './index.module.css'
