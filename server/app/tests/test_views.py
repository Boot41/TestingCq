from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job
import json

class JobViewTests(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(title='Test Job', description='This is a test job description.', employer_id=1)

    def test_create_job(self):
        url = reverse('job-list')  # assuming 'job-list' url name
        data = {'title': 'New Job', 'description': 'New job description.', 'employer_id': 1}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('job_id' in response.json())

    def test_fetch_jobs_by_employer(self):
        url = reverse('job-list-by-employer', args=[1])  # assuming you have this name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.json()), 0)  # ensure there's at least one job

    def test_update_job(self):
        url = reverse('job-detail', args=[self.job.id])
        data = {'title': 'Updated Job Title', 'description': 'Updated description.'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.job.refresh_from_db()
        self.assertEqual(self.job.title, 'Updated Job Title')

    def test_delete_job(self):
        url = reverse('job-detail', args=[self.job.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Job.objects.filter(id=self.job.id).exists())

    def test_update_job_not_found(self):
        url = reverse('job-detail', args=[999])
        data = {'title': 'Updated Job Title', 'description': 'Updated description.'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_job_not_found(self):
        url = reverse('job-detail', args=[999])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
