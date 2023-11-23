import ReservationService from "../service/reservations.js";
import Errors from "../service/service_errors.js";

class ReservationController {
  constructor() {
    this.service = new ReservationService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let reservations = await this.service.get(id);
     
      if(Object.keys(reservations).length > 0){
        res.status(200)
        res.json(reservations);
      }else{
        res.status(404)
        res.json(reservations);
      }
      
    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else if (error instanceof Errors.InvalidParameterError) {
        res.status(400).json({ error: "el parametro es invalido" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  add = async (req, res) => {
    try {
      let prod = req.body;

      const added = await this.service.add(prod);
      res.status(201).json({ data: added });
    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "la reserva no es valida para crear" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = req.body;
      
      const updated = await this.service.update(id, reservation);
      res.status(200).json(updated);
    } catch (error) {
      if (error instanceof Errors.ValidationError) {
        res.status(400).json({ error: "la reserva enviada no es valida para actualizar" })
      } else if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.service.delete(id);
      res.status(200).json(deleted);
    } catch (error) {
      if (error instanceof Errors.NotFoundError) {
        res.status(404).json({ error: "no se encontro el ID" })
      } else {
        res.status(500).json({ error: 'ha ocurrido un error inesperado' });
      }
    }
  };
}

export default ReservationController;
