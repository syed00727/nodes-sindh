package repos

func SetVoltageLimit(nodeId int, voltageLimit float32) error {
	_, e := db.Exec("insert into voltage_limit(id, limit_1) values($1, $2) "+
		"on conflict(id) do update "+
		"set limit_1 = $2 "+
		"where voltage_limit.id = $1", nodeId, voltageLimit)
	return e
}

func GetVoltageLimit(nodeId int) (float32, error) {
	row := db.QueryRow("select limit_1 from voltage_limit where id = $1", nodeId)

	var voltageLimit float32
	e := row.Scan(&voltageLimit)
	if e != nil {
		return 0.0, e
	}
	return voltageLimit, e

}
