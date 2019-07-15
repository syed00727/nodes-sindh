create table node_pings(
    id integer not null primary key ,
    ping_time timestamp without time zone,
    status integer,
    battery_voltage float,
    power_solar_input float,
    power_battery_to_grid float,
    power_grid_to_battery float,
    power_battery_to_load float,
    grid_voltage float,
    switch_1 integer,
    switch_2 integer,
    limit_1 float,
    limit_2 float,
    limit_3 float,
    limit_4 float,
    load_switch_1 integer,
    load_switch_2 integer,
    load_switch_3 integer,
    load_switch_4 integer
);

create table node_commands(
    id integer primary key,
    command_time timestamp without time zone,
    command text,
    received integer
);

create table voltage_limit(
    id integer primary key,
    limit_1 float,
    limit_2 float,
    limit_3 float,
    limit_4 float
);