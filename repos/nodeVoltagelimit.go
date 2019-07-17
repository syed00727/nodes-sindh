package repos

import "log"

func SetVoltageLimit(nodeId int, limit_1 float64, limit_2 float64, limit_3 float64, limit_4 float64) error {
	_, e := db.Exec("insert into voltage_limit(id, limit_1, limit_2, limit_3, limit_4) values($1, $2, $3, $4 ,$5) "+
		"on conflict(id) do update "+
		"set limit_1 = $2, "+
		"limit_2 = $3, "+
		"limit_3 = $4, "+
		"limit_4 = $5"+
		"where voltage_limit.id = $1", nodeId, limit_1, limit_2, limit_3, limit_4)
	return e
}

func GetVoltageLimit(nodeId int) (float64, float64, error) {
	row := db.QueryRow("select limit_1, limit_2 from voltage_limit where id = $1", nodeId)

	var limit1 float64
	var limit2 float64
	e := row.Scan(&limit1, &limit2)
	if e != nil {
		log.Println(e)
		return 0.0, 0.0, nil
	}
	return limit1, limit2, e

}
