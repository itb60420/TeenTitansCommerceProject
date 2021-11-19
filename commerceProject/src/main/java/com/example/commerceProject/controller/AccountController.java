package com.example.commerceProject.controller;

import com.example.commerceProject.domain.Account;
import com.example.commerceProject.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class AccountController {
    private final AccountService accountService;

    @CrossOrigin
    @PostMapping("/book") //create account
    public ResponseEntity<?> save(@RequestBody Account account){
        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/book") //find all accounts
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/book/{id}") //find account by id
    public ResponseEntity<?> findById(@PathVariable Long id){
        return new ResponseEntity<>(accountService.findAccount(id), HttpStatus.OK);
    }

    @CrossOrigin
    @PutMapping("/book/{id}") //update account
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Account account){
        return new ResponseEntity<>(accountService.update(id, account), HttpStatus.OK);
    }

    @CrossOrigin
    @DeleteMapping("/book/{id}") //delete account
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        return new ResponseEntity<>(accountService.delete(id), HttpStatus.OK);
    }
}