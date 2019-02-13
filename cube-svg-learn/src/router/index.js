import Vue from 'vue'
import Router from 'vue-router'

// 基础
import Base from '@/pages/base/index.vue'
import Rect from '@/pages/base/children/rect/rect.vue'
import Circle from '@/pages/base/children/circle/circle.vue'
import Ellipse from '@/pages/base/children/ellipse/ellipse.vue'
import Transform from '@/pages/base/children/transform/transform.vue'
import Path from '@/pages/base/children/path/path.vue'
import PathCircle from '@/pages/base/children/path-circle/path-circle.vue'
import PathAnimation from '@/pages/base/children/path-animation/path-animation.vue'
import PathBezier from '@/pages/base/children/path-bezier/path-bezier.vue'

// 实战
import Actions from '@/pages/actions/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      component: Base,
      children: [
        {
          path: 'rect',
          name: 'rect',
          component: Rect
        },
        {
          path: 'circle',
          name: 'circle',
          component: Circle
        },
        {
          path: 'ellipse',
          name: 'ellipse',
          component: Ellipse
        },
        {
          path: 'path',
          name: 'path',
          component: Path
        },
        {
          path: 'path-circle',
          name: 'path-circle',
          component: PathCircle
        },
        {
          path: 'path-bezier',
          name: 'path-bezier',
          component: PathBezier
        },
        {
          path: 'path-animation',
          name: 'path-animation',
          component: PathAnimation
        },
        {
          path: 'transform',
          name: 'transform',
          component: Transform
        },
      ]
    },
    {
      path: '/actions',
      component: Actions,
    }
  ]
})
