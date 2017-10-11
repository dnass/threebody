const threeBodyCalc = ({ speed, g, bodies, trails }) => {
  const interval = 0.01;
  for (let j = 0; j < speed; j++) {

    const vectors = [
      bodies[1].position.clone().sub(bodies[0].position),
      bodies[2].position.clone().sub(bodies[0].position),
      bodies[2].position.clone().sub(bodies[1].position),
    ]

    const forces = [
      vectors[0].clone().normalize().multiplyScalar(-g * bodies[0].mass * bodies[1].mass / Math.pow(vectors[0].length(), 2)),
      vectors[1].clone().normalize().multiplyScalar(-g * bodies[0].mass * bodies[2].mass / Math.pow(vectors[1].length(), 2)),
      vectors[2].clone().normalize().multiplyScalar(-g * bodies[1].mass * bodies[2].mass / Math.pow(vectors[2].length(), 2))
    ]

    const momentums = [
      bodies[0].momentum.sub(forces[0].add(forces[1]).multiplyScalar(interval)),
      bodies[1].momentum.add(forces[0].sub(forces[2]).multiplyScalar(interval)),
      bodies[2].momentum.add(forces[1].add(forces[2]).multiplyScalar(interval))
    ]

    const positions = [
      bodies[0].position.clone().add(momentums[0].clone().multiplyScalar(interval / bodies[0].mass)),
      bodies[1].position.clone().add(momentums[1].clone().multiplyScalar(interval / bodies[1].mass)),
      bodies[2].position.clone().add(momentums[2].clone().multiplyScalar(interval / bodies[2].mass))
    ]

    bodies.forEach((body, i) => {
      bodies[i].position = positions[i];
      bodies[i].momentum = momentums[i];
    })

    trails.forEach((trail, i) => {
      trails[i].push(positions[i])
    })
  }

  return { bodies, trails }
}

export default threeBodyCalc;
