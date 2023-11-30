import { createApi, createStore } from 'effector'
import { useUnit } from 'effector-react'

export const $historySectionOpened = createStore(true)
export const historySection = createApi($historySectionOpened, {
  open: () => true,
  close: () => false,
})

export const $convertListSectionOpened = createStore(true)
export const convertListSection = createApi($convertListSectionOpened, {
  open: () => true,
  close: () => false,
})

export function useSections() {
  const {
    historyOpened,
    convertListOpened,
    onHistoryClose,
    onHistoryOpen,
    onConvertListClose,
    onConvertListOpen,
  } = useUnit({
    historyOpened: $historySectionOpened,
    convertListOpened: $convertListSectionOpened,
    onHistoryOpen: historySection.open,
    onHistoryClose: historySection.close,
    onConvertListOpen: convertListSection.open,
    onConvertListClose: convertListSection.close,
  })

  const onHistoryToggle = () => {
    if (historyOpened) {
      onHistoryClose()
      return
    }
    onHistoryOpen()
  }

  const onConvertListToggle = () => {
    if (convertListOpened) {
      onConvertListClose()
      return
    }
    onConvertListOpen()
  }

  return {
    historyOpened,
    convertListOpened,
    onHistoryToggle,
    onConvertListToggle,
  }
}
