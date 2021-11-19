package com.example.commerceProject.service;

import com.example.commerceProject.domain.Account;
import com.example.commerceProject.domain.CubicleReservations;
import com.example.commerceProject.repository.CubicleReservationsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CubicleReservationsService {
    private final CubicleReservationsRepository cubicleReservationsRepository;

    @Transactional /* needs logic to check if reservation will work!!!!! */ //create cubicle reservation
    public CubicleReservations create(CubicleReservations cubicleReservations){
        return cubicleReservationsRepository.save(cubicleReservations);
    }

    @Transactional(readOnly = true) //find all cubicle reservations
    public List<CubicleReservations> findAll(){ return cubicleReservationsRepository.findAll(); }

    @Transactional(readOnly = true) //find cubicle reservation by user id
    public CubicleReservations findResById(Account account){
        return cubicleReservationsRepository.findById(account.getId())
                .orElseThrow(()->new IllegalArgumentException("Check Id"));
    }

    /* Find cubicles by availability - finish logic!!!!! */
    @Transactional(readOnly = true) //find cubicle availability
    public List<CubicleReservations> findCubiclesByAvailability() {
        return null;
    }

    @Transactional //update cubicle reservation
    public CubicleReservations update(Long id, CubicleReservations cubicleReservation){
        CubicleReservations cubiclesEntity = cubicleReservationsRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("check Id"));

        cubiclesEntity.setReservationStartDay(cubicleReservation.getReservationStartDay());
        cubiclesEntity.setReservationEndDay(cubicleReservation.getReservationEndDay());
        return null;
    }

    @Transactional //delete cubicle reservation
    public String delete(Long id){
        cubicleReservationsRepository.deleteById(id);
        return "ok";
    }
}