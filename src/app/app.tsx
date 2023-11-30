import { Pages } from '@/pages'
import { $loading } from '@/shared/api/exchange'
import { Show } from '@/shared/lib/show'
import { router } from '@/shared/routing'
import { Layout } from '@/shared/ui/layout'
import { Loader } from '@/shared/ui/loader'
import { RouterProvider } from 'atomic-router-react'
import { useUnit } from 'effector-react'

export const App = () => {
  const loading = useUnit($loading)
  return (
    <RouterProvider router={router}>
      <Show when={!loading} fallback={<Loader />}>
        <Layout>
          <Pages />
        </Layout>
      </Show>
    </RouterProvider>
  )
}
