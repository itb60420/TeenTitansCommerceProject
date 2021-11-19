package com.example.commerceProject.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class CubicleReservations {
    final int AVAILABLE_CUBICLES = 50;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date reservationStartDay;
    private Date reservationEndDay;
    private Long reservationOwnerId;
    private Long cubicleName;
}