/**
 * Created by mcastro on 11/16/16.
 */
import {sequelize} from '../../sqldb';

export function reporteMonitoreo(req, res) {
  return sequelize.query(`CALL sp_Reporte_VerMonitoreoPaciente('2016-11-09 00:00:00', '2016-11-17 00:00:00')`)
    .spread((...params) => {
      res.status(200).json(params);
    });
}


