from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job

class JobViewTests(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(title='Test Job', description='This is a test job description.')

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
