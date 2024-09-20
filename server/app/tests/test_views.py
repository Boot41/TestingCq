from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job, JobApplication
import json

class JobViewTests(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(title='Test Job', description='This is a test job description.', employer_id=1)
        self.seeker_id = 1

    # Existing test methods omitted for brevity

    def test_apply_for_job(self):
        url = reverse('job-apply', args=[self.job.id])  # Assume you define name 'job-apply'
        data = {'seeker_id': self.seeker_id}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('application_id' in response.json())

    def test_track_applications(self):
        application = JobApplication.objects.create(job=self.job, seeker_id=self.seeker_id)
        url = reverse('job-seeker-applications', args=[self.seeker_id])  # Assume you define name 'job-seeker-applications'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.json()), 0)  # should return the created application

    def test_apply_for_non_existent_job(self):
        url = reverse('job-apply', args=[999])  # Non-existent job
        data = {'seeker_id': self.seeker_id}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)