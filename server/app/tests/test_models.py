from django.test import TestCase
from .models import Job, JobApplication

class JobModelTests(TestCase):
    def test_string_representation(self):
        job = Job(title='Test Job')
        self.assertEqual(str(job), job.title)

    def test_job_creation(self):
        job = Job.objects.create(title='New Job', description='Job description.', employer_id=1)
        self.assertIsInstance(job, Job)
        self.assertEqual(job.title, 'New Job')

    def test_application_creation(self):
        job = Job.objects.create(title='New Job', description='Job description.', employer_id=1)
        application = JobApplication.objects.create(job=job, seeker_id=1)
        self.assertIsInstance(application, JobApplication)
        self.assertEqual(application.job, job)