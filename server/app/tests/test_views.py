from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Job, JobApplication, JobSeekerProfile
import json

class JobViewTests(APITestCase):
    # Existing tests omitted for brevity

class JobSeekerProfileViewTests(APITestCase):
    def setUp(self):
        self.seeker_profile = JobSeekerProfile.objects.create(work_history='Sample Work History', skills='Python, Django', education='Bachelor Degree')

    def test_create_profile(self):
        url = reverse('job-seekers')
        data = {'work_history': 'New History', 'skills': 'Java, Python', 'education': 'Master Degree'}
        response = self.client.post(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('seeker_id' in response.json())

    def test_fetch_profile(self):
        url = reverse('job-seekers', args=[self.seeker_profile.seeker_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['seeker_id'], self.seeker_profile.seeker_id)

    def test_update_profile(self):
        url = reverse('job-seekers', args=[self.seeker_profile.seeker_id])
        data = {'work_history': 'Updated History', 'skills': 'Python, Django, REST', 'education': 'PhD'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.seeker_profile.refresh_from_db()
        self.assertEqual(self.seeker_profile.skills, 'Python, Django, REST')

    def test_fetch_non_existent_profile(self):
        url = reverse('job-seekers', args=[999])  # Non-existent seeker
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_non_existent_profile(self):
        url = reverse('job-seekers', args=[999])  # Non-existent seeker
        data = {'work_history': 'Some Work History'}
        response = self.client.put(url, data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)