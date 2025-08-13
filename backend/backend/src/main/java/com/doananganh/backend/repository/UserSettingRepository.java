package com.doananganh.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doananganh.backend.entity.UserSetting;

@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {
    
    Optional<UserSetting> findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
    
    @Query("SELECT us FROM UserSetting us WHERE us.theme = :theme")
    List<UserSetting> findByTheme(@Param("theme") String theme);
    
    @Query("SELECT us FROM UserSetting us WHERE us.language = :language")
    List<UserSetting> findByLanguage(@Param("language") String language);
}
