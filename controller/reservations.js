import ReservationService from "../service/reservations.js";

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
      console.log("Error al obtener reservas: ", error);
    }
  };

  add = async (req, res) => {
    try {
      let prod = req.body;

      const added = await this.service.add(prod);

      if(Object.keys(added).length > 0){
        res.status(201)
        res.json(added);
      }else{
        res.status(404)
        console.log("Usuario no encontrado");
      }
      
    } catch (error) {
      res.status(400)
      console.log("Error al crear reserva: ", error);
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const reservation = req.body;
      const updated = await this.service.update(id, reservation);
      res.json(updated);
    } catch (error) {
      console.log("Error al actualizar reserva: ", error);
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await this.service.delete(id);
      res.json(deleted);
    } catch (error) {
      console.log("Error al eliminar reserva: ", error);
    }
  };
}

export default ReservationController;
