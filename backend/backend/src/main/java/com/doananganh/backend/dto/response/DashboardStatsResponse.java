package com.doananganh.backend.dto.response;

import java.math.BigDecimal;
import java.util.Objects;

public class DashboardStatsResponse {
    private Long activeProjects;
    private Long tasksInProgress;
    private Long overdueTasks;
    private Long completedThisWeek;
    private BigDecimal teamEfficiency;
    private Long aiSuggestionsCount;
    private BigDecimal workloadBalance;
    
    // Additional metrics
    private Long totalTeamMembers;
    private Long availableMembers;
    private BigDecimal averageTaskCompletionTime;
    private String lastUpdated;

    // Constructors
    public DashboardStatsResponse() {}

    public DashboardStatsResponse(Long activeProjects, Long tasksInProgress, Long overdueTasks,
                                  Long completedThisWeek, BigDecimal teamEfficiency, Long aiSuggestionsCount,
                                  BigDecimal workloadBalance, Long totalTeamMembers, Long availableMembers,
                                  BigDecimal averageTaskCompletionTime, String lastUpdated) {
        this.activeProjects = activeProjects;
        this.tasksInProgress = tasksInProgress;
        this.overdueTasks = overdueTasks;
        this.completedThisWeek = completedThisWeek;
        this.teamEfficiency = teamEfficiency;
        this.aiSuggestionsCount = aiSuggestionsCount;
        this.workloadBalance = workloadBalance;
        this.totalTeamMembers = totalTeamMembers;
        this.availableMembers = availableMembers;
        this.averageTaskCompletionTime = averageTaskCompletionTime;
        this.lastUpdated = lastUpdated;
    }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final DashboardStatsResponse response = new DashboardStatsResponse();

        public Builder activeProjects(Long activeProjects) {
            response.activeProjects = activeProjects;
            return this;
        }

        public Builder tasksInProgress(Long tasksInProgress) {
            response.tasksInProgress = tasksInProgress;
            return this;
        }

        public Builder overdueTasks(Long overdueTasks) {
            response.overdueTasks = overdueTasks;
            return this;
        }

        public Builder completedThisWeek(Long completedThisWeek) {
            response.completedThisWeek = completedThisWeek;
            return this;
        }

        public Builder teamEfficiency(BigDecimal teamEfficiency) {
            response.teamEfficiency = teamEfficiency;
            return this;
        }

        public Builder aiSuggestionsCount(Long aiSuggestionsCount) {
            response.aiSuggestionsCount = aiSuggestionsCount;
            return this;
        }

        public Builder workloadBalance(BigDecimal workloadBalance) {
            response.workloadBalance = workloadBalance;
            return this;
        }

        public Builder totalTeamMembers(Long totalTeamMembers) {
            response.totalTeamMembers = totalTeamMembers;
            return this;
        }

        public Builder availableMembers(Long availableMembers) {
            response.availableMembers = availableMembers;
            return this;
        }

        public Builder averageTaskCompletionTime(BigDecimal averageTaskCompletionTime) {
            response.averageTaskCompletionTime = averageTaskCompletionTime;
            return this;
        }

        public Builder lastUpdated(String lastUpdated) {
            response.lastUpdated = lastUpdated;
            return this;
        }

        public DashboardStatsResponse build() {
            return response;
        }
    }

    // Getters
    public Long getActiveProjects() {
        return activeProjects;
    }

    public Long getTasksInProgress() {
        return tasksInProgress;
    }

    public Long getOverdueTasks() {
        return overdueTasks;
    }

    public Long getCompletedThisWeek() {
        return completedThisWeek;
    }

    public BigDecimal getTeamEfficiency() {
        return teamEfficiency;
    }

    public Long getAiSuggestionsCount() {
        return aiSuggestionsCount;
    }

    public BigDecimal getWorkloadBalance() {
        return workloadBalance;
    }

    public Long getTotalTeamMembers() {
        return totalTeamMembers;
    }

    public Long getAvailableMembers() {
        return availableMembers;
    }

    public BigDecimal getAverageTaskCompletionTime() {
        return averageTaskCompletionTime;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    // Setters
    public void setActiveProjects(Long activeProjects) {
        this.activeProjects = activeProjects;
    }

    public void setTasksInProgress(Long tasksInProgress) {
        this.tasksInProgress = tasksInProgress;
    }

    public void setOverdueTasks(Long overdueTasks) {
        this.overdueTasks = overdueTasks;
    }

    public void setCompletedThisWeek(Long completedThisWeek) {
        this.completedThisWeek = completedThisWeek;
    }

    public void setTeamEfficiency(BigDecimal teamEfficiency) {
        this.teamEfficiency = teamEfficiency;
    }

    public void setAiSuggestionsCount(Long aiSuggestionsCount) {
        this.aiSuggestionsCount = aiSuggestionsCount;
    }

    public void setWorkloadBalance(BigDecimal workloadBalance) {
        this.workloadBalance = workloadBalance;
    }

    public void setTotalTeamMembers(Long totalTeamMembers) {
        this.totalTeamMembers = totalTeamMembers;
    }

    public void setAvailableMembers(Long availableMembers) {
        this.availableMembers = availableMembers;
    }

    public void setAverageTaskCompletionTime(BigDecimal averageTaskCompletionTime) {
        this.averageTaskCompletionTime = averageTaskCompletionTime;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    // toString
    @Override
    public String toString() {
        return "DashboardStatsResponse{" +
                "activeProjects=" + activeProjects +
                ", tasksInProgress=" + tasksInProgress +
                ", overdueTasks=" + overdueTasks +
                ", completedThisWeek=" + completedThisWeek +
                ", teamEfficiency=" + teamEfficiency +
                ", aiSuggestionsCount=" + aiSuggestionsCount +
                ", workloadBalance=" + workloadBalance +
                ", totalTeamMembers=" + totalTeamMembers +
                ", availableMembers=" + availableMembers +
                ", averageTaskCompletionTime=" + averageTaskCompletionTime +
                ", lastUpdated='" + lastUpdated + '\'' +
                '}';
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DashboardStatsResponse that = (DashboardStatsResponse) o;
        return Objects.equals(activeProjects, that.activeProjects) &&
               Objects.equals(tasksInProgress, that.tasksInProgress) &&
               Objects.equals(overdueTasks, that.overdueTasks) &&
               Objects.equals(completedThisWeek, that.completedThisWeek) &&
               Objects.equals(teamEfficiency, that.teamEfficiency) &&
               Objects.equals(aiSuggestionsCount, that.aiSuggestionsCount) &&
               Objects.equals(workloadBalance, that.workloadBalance) &&
               Objects.equals(totalTeamMembers, that.totalTeamMembers) &&
               Objects.equals(availableMembers, that.availableMembers) &&
               Objects.equals(averageTaskCompletionTime, that.averageTaskCompletionTime) &&
               Objects.equals(lastUpdated, that.lastUpdated);
    }

    @Override
    public int hashCode() {
        return Objects.hash(activeProjects, tasksInProgress, overdueTasks, completedThisWeek,
                teamEfficiency, aiSuggestionsCount, workloadBalance, totalTeamMembers,
                availableMembers, averageTaskCompletionTime, lastUpdated);
    }
}