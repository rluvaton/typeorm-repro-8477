import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Place } from './place.entity';
import { User } from './user.entity';

async function run(connection: Connection) {
  const root1 = await connection.manager.save(
    connection.manager.create(Place, {
      name: 'root1',
    } as Place),
  );
  const user1 = await connection.manager.save(
    connection.manager.create(User, {
      id: 'user1',
      rootPlaces: [root1],
    } as User),
  );

  console.log(
    await connection.manager.findOne(User, user1.id, {
      select: ['id', 'rootPlaces'],
      relations: ['rootPlaces'],
    }),
  );
}

createConnection()
  .then(async (connection) => {
    try {
      await run(connection);
    } finally {
      await connection.close();
    }
  })
  .catch((error) => console.log(error));
