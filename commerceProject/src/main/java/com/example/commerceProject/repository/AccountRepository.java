package com.example.commerceProject.repository;

import com.example.commerceProject.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
//    Account save(Account account); //saves a new member to the database (admin)
//    Account findAccount(Long id); //finds an account in the database with a given id
//    Account findAccountByEmail(String email); //finds an account in the database with a given email (admin)
//    List<Account> findAll(); //finds all accounts in the database (admin)
//    //Account deleteById(Long id); //deletes an account with given id from database (admin)
}