import ReservationService from "../service/reservations.js";

class ReservationController {
  constructor() {
    this.service = new ReservationService();
  }

  get = async (req, res) => {
    try {
      const { id } = req.params;

      let reservations = await this.service.get(id);
      res.json(reservations);
    } catch (error) {
      console.log("Error al obtener reservas: ", error);
    }
  };
  get_by_user = async (req, res) => { 
    // Searchs for all reservations of an specific user, by user id
    try {
      const { id } = req.params;

      let user_reservations = await this.service.get_by_user(id);
      res.json(user_reservations);
    } catch (error) {
      console.log("Error al obtener reserva: ", error);
    }
  };

  add = async (req, res) => {
    try {
      let prod = req.body;

      const added = await this.service.add(prod);
      res.status(201)
      res.json(added);
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
