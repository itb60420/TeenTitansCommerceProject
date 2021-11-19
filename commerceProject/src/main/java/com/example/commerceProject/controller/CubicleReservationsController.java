package com.example.commerceProject.controller;

import com.example.commerceProject.domain.Account;
import com.example.commerceProject.domain.CubicleReservations;
import com.example.commerceProject.service.CubicleReservationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class CubicleReservationsController {
    private final CubicleReservationsService cubicleReservationsService;

    @CrossOrigin
    @PostMapping("/book") //create cubicle reservation
    public ResponseEntity<?> save(@RequestBody CubicleReservations cubicleReservations){
        return new ResponseEntity<>(cubicleReservationsService.create(cubicleReservations), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/book") //find all cubicle reservations
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(cubicleReservationsService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/book/{account}") //find cubicle reservation by user id
    public ResponseEntity<?> findById(@PathVariable Account account){
        return new ResponseEntity<>(cubicleReservationsService.findResById(account), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/") //find cubicle availability
    public ResponseEntity<?> findByAvailability() {
        return new ResponseEntity<>(cubicleReservationsService.findCubiclesByAvailability(), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/book/{id}") //update cubicle reservation
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CubicleReservations cubicleReservations){
        return new ResponseEntity<>(cubicleReservationsService.update(id, cubicleReservations), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/book/{id}") //delete cubicle reservation
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(cubicleReservationsService.delete(id), HttpStatus.OK);
    }
}