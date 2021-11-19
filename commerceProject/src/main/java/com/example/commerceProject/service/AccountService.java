package com.example.commerceProject.service;

import com.example.commerceProject.domain.Account;
import com.example.commerceProject.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;

    @Transactional //create account
    public Account create(Account account){ return accountRepository.save(account); }

    @Transactional(readOnly = true) //find all accounts
    public List<Account> findAll(){ return accountRepository.findAll(); }

    @Transactional(readOnly = true) //find account by id
    public Account findAccount(Long id){
        return accountRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Check Id"));
    }

    @Transactional
    public Account update(Long id, Account account){ //update account
        Account accountEntity = accountRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("check Id"));  //Persistence Context

        accountEntity.setFirstName(account.getFirstName());
        accountEntity.setLastName(account.getLastName());
        accountEntity.setEmail(account.getEmail());
        accountEntity.setPassword(account.getPassword());
        return null;
    }

    @Transactional //delete account
    public String delete(Long id){
        accountRepository.deleteById(id);
        return "ok";
    }
}