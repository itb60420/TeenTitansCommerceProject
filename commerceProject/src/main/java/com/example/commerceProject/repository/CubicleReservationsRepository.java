package com.example.commerceProject.repository;

import com.example.commerceProject.domain.CubicleReservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CubicleReservationsRepository extends JpaRepository<CubicleReservations, Long> {
//    CubicleReservations save(CubicleReservations cubicleReservation); //saves a new reservation
//    List<CubicleReservations> findAllCubicleReservationByOwnerId(Long reservationOwnerId); //gets all reservations by one user
//    List<CubicleReservations> findAll(); //gets all reservations
//    //CubicleReservations deleteById(Long id); //deletes cubicle reservation with given id from database
}