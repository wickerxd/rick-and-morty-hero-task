import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BackButton from '../ui/BackButton.vue'

const router = vi.hoisted(() => ({ back: vi.fn(), push: vi.fn() }))
vi.mock('vue-router', () => ({ useRouter: () => router }))

beforeEach(() => vi.clearAllMocks())

describe('BackButton', () => {
  it('goes back to previous page', async () => {
    window.history.replaceState({ back: '/?page=3' }, '')
    await mount(BackButton).find('button').trigger('click')
    expect(router.back).toHaveBeenCalled()
    expect(router.push).not.toHaveBeenCalled()
  })

  it('goes to main page when coming from external source', async () => {
    window.history.replaceState({ back: null }, '')
    await mount(BackButton).find('button').trigger('click')
    expect(router.push).toHaveBeenCalledWith('/')
    expect(router.back).not.toHaveBeenCalled()
  })
})
