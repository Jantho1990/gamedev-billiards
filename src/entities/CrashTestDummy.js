import Texture from '../../pop/Texture';
import TileSprite from '../../pop/TileSprite'
import Vec from '../../pop/utils/Vec'
import math from '../../pop/utils/math'
import physics from '../../pop/utils/physics'

const texture = new Texture('res/img/crash_test.png')

class CrashTestDummy extends TileSprite {
  constructor(bounds) {
    super(texture, 48, 48)
    this.pivot = { x: 24, y: 24 }
    this.radius = 24
    this.frame.x = math.rand(4)
    this.vel = new Vec()
    this.acc = new Vec()
    this.bounds = bounds
    this.rotation = math.rand(4) * (Math.PI / 2)
  }

  update(dt) {
    const { pos, vel, bounds, w, h } = this

    if (math.randOneIn(1000)) {
      const MAX_POWER = 500
      physics.applyImpulse(
        this,
        {
          x: math.rand(-MAX_POWER, MAX_POWER),
          y: math.rand(-MAX_POWER, MAX_POWER)
        },
        dt
      )
    }

    physics.applyFriction(this, 100)
    physics.integratePos(this, dt)

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      vel.x *= -1
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      vel.y *= -1
    }

    this.rotation += vel.x * 0.05 * dt
  }
}

export default CrashTestDummy