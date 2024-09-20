from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    employer_id = models.IntegerField()  # To link the job to an employer
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    seeker_id = models.IntegerField()  # To link the application to a job seeker
    status = models.CharField(max_length=50, default='pending')  # e.g., pending, accepted, rejected
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Application for {self.job.title} by Seeker {self.seeker_id}"

class JobSeekerProfile(models.Model):
    seeker_id = models.AutoField(primary_key=True)
    work_history = models.TextField()
    skills = models.CharField(max_length=255)
    education = models.CharField(max_length=255)

    def __str__(self):
        return f"Profile of Seeker {self.seeker_id}"