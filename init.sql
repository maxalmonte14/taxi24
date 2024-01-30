DROP TABLE IF EXISTS "drivers" CASCADE;
DROP TABLE IF EXISTS "passengers" CASCADE;
DROP TABLE IF EXISTS "rides" CASCADE;
DROP TABLE IF EXISTS "driver_locations" CASCADE;
DROP TABLE IF EXISTS "passenger_locations" CASCADE;

CREATE TABLE IF NOT EXISTS "drivers" (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "profile_picture" VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "passengers" (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255) NOT NULL,
  "profile_picture" VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "rides" (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "origin_latitude" VARCHAR(255) NOT NULL,
  "origin_longitude" VARCHAR(255) NOT NULL,
  "destination_latitude" VARCHAR(255) NOT NULL,
  "destination_longitude" VARCHAR(255) NOT NULL,
  "is_completed" BOOLEAN NOT NULL,
  "driver_id" INT NOT NULL,
  "passenger_id" INT NOT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_driver" FOREIGN KEY("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE,
  CONSTRAINT "fk_passenger" FOREIGN KEY("passenger_id") REFERENCES "passengers"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "driver_locations" (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "latitude" VARCHAR(255) NOT NULL,
  "longitude" VARCHAR(255) NOT NULL,
  "driver_id" INT NOT NULL,
  "is_available" BOOLEAN NOT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_driver" FOREIGN KEY("driver_id") REFERENCES "drivers"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "passenger_locations" (
  "id" INT GENERATED ALWAYS AS IDENTITY,
  "latitude" VARCHAR(255) NOT NULL,
  "longitude" VARCHAR(255) NOT NULL,
  "passenger_id" INT NOT NULL,
  "is_riding" BOOLEAN NOT NULL,
  PRIMARY KEY("id"),
  CONSTRAINT "fk_passenger" FOREIGN KEY("passenger_id") REFERENCES "passengers"("id") ON DELETE CASCADE
);

INSERT INTO "drivers" ("name", "profile_picture") VALUES ('John Doe', 'https://randomuser.me/api/portraits/men/76.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Jane Smith', 'https://randomuser.me/api/portraits/women/16.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Robert Johnson', NULL);
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Samantha White', 'https://randomuser.me/api/portraits/women/41.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Michael Brown', 'https://randomuser.me/api/portraits/men/90.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Emily Davis', NULL);
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Christopher Lee', 'https://randomuser.me/api/portraits/men/92.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Sophia Taylor', 'https://randomuser.me/api/portraits/women/27.jpg');
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('David Wilson', NULL);
INSERT INTO "drivers" ("name", "profile_picture") VALUES ('Olivia Harris', 'https://randomuser.me/api/portraits/women/55.jpg');

INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Daniel Miller', 'https://randomuser.me/api/portraits/men/75.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Isabella Turner', 'https://randomuser.me/api/portraits/women/18.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Ethan Wright', NULL);
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Madison Adams', 'https://randomuser.me/api/portraits/women/9.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Jackson Moore', 'https://randomuser.me/api/portraits/men/91.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Ava Collins', NULL);
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Liam Turner', 'https://randomuser.me/api/portraits/men/63.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Aria Mitchell', 'https://randomuser.me/api/portraits/women/17.jpg');
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Logan Davis', NULL);
INSERT INTO "passengers" ("name", "profile_picture") VALUES ('Grace Turner', 'https://randomuser.me/api/portraits/women/3.jpg');

INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.433921976987083',
  '-69.95092447279306',
  '18.48564900782328',
  '-69.93931318010746',
  true,
  1,
  1
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.490596135413195',
  '-69.97763326077538',
  '18.487234641192863',
  '-70.00017055080171',
  false,
  2,
  2
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.46379353756718',
  '-69.93473301349387',
  '18.460822788714104',
  '-69.91942939559058',
  true,
  3,
  3
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.472223335418633',
  '-69.90846986883439',
  '18.476417326071143',
  '-69.88324792276927',
  false,
  4,
  4
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.48838672254915',
  '-69.89557057973872',
  '18.5442965460169',
  '-69.86048468939171',
  true,
  5,
  5
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.557078562174784',
  '-69.9402775438603',
  '18.511134251244368',
  '-69.96382951700167',
  false,
  6,
  6
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.54702706811233',
  '-69.89882896820293',
  '18.510933149816076',
  '-69.92756493675834',
  true,
  7,
  7
);
INSERT INTO "rides"
(
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.525814017055705',
  '-69.95630090531374',
  '18.452487550118363',
  '-69.97459482239825',
  false,
  8,
  8
);
INSERT INTO "rides" (
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.441663150206768',
  '-69.96920951512651',
  '18.45189237070058',
  '-69.95279553554698',
  true,
  9,
  9
);
INSERT INTO "rides" (
  "origin_latitude",
  "origin_longitude",
  "destination_latitude",
  "destination_longitude",
  "is_completed",
  "driver_id",
  "passenger_id"
)
VALUES
(
  '18.473502262652037',
  '-69.94084953546606',
  '18.48004329066718',
  '-69.98443714876592',
  false,
  10,
  10
);

INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.47685585743204', '-69.93664821080108', 1, false);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.477192685135204', '-69.9070083548886', 2, true);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.47567609325443', '-69.94347685906406', 3, false);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.43378177661573', '-69.95929288580128', 4, true);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.494605385345203', '-69.95344736664475', 5, false);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.434360550084197', '-69.95078230242719', 6, true);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.49696012206574', '-69.92417646259665', 7, false);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.460127876825', '-69.90491211866211', 8, true);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.4938264049879', '-69.89433506747415', 9, false);
INSERT INTO "driver_locations" ("latitude", "longitude", "driver_id", "is_available")
VALUES ('18.474576393166174', '-69.89708180908073', 10, true);

INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.475688367797442', '-69.89087567496331', 1, true);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.481285435425466', '-69.88923412375492', 2, false);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.46274293153041', '-69.89808389348363', 3, true);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.502303241074827', '-69.90150312265659', 4, false);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.470459258525057', '-69.89740325739864', 5, true);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.49281632590196', '-69.91181466602238', 6, false);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.462143441295115', '-69.90785588336514', 7, true);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.482533101416347', '-69.91189510067564', 8, false);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.466370570633448', '-69.91313891609235', 9, true);
INSERT INTO "passenger_locations" ("latitude", "longitude", "passenger_id", "is_riding")
VALUES ('18.477661956559363', '-69.91775878750549', 10, false);