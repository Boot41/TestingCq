from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job, JobApplication
import json

class JobViewTests(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(title='Test Job', description='This is a test job description.', employer_id=1)
        self.seeker_id = 1
        self.application = JobApplication.objects.create(job=self.job, seeker_id=self.seeker_id)

    def test_apply_for_job(self):
        url = reverse('job-apply', args=[self.job.id])
        data = {'seeker_id': self.seeker_id}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('application_id' in response.json())

    def test_track_applications(self):
        url = reverse('job-seeker-applications', args=[self.seeker_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.json()), 0)  # should return the created application

    def test_update_application(self):
        url = reverse('job-apply', args=[self.application.id])
        data = {'status': 'accepted'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.application.refresh_from_db()
        self.assertEqual(self.application.status, 'accepted')

    def test_withdraw_application(self):
        url = reverse('job-apply', args=[self.application.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(JobApplication.objects.filter(id=self.application.id).exists())

    def test_apply_for_non_existent_job(self):
        url = reverse('job-apply', args=[999])  # Non-existent job
        data = {'seeker_id': self.seeker_id}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_non_existent_application(self):
        url = reverse('job-apply', args=[999])  # Non-existent application
        data = {'status': 'accepted'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_withdraw_non_existent_application(self):
        url = reverse('job-apply', args=[999])  # Non-existent application
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)