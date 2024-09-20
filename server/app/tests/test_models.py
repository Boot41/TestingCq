from django.test import TestCase
from .models import Job, JobApplication, JobSeekerProfile

class JobModelTests(TestCase):
    # Existing tests omitted for brevity

class JobSeekerProfileModelTests(TestCase):
    def test_string_representation(self):
        profile = JobSeekerProfile(work_history='History', skills='Python', education='Degree')
        self.assertEqual(str(profile), f'Profile of Seeker {profile.seeker_id}')

    def test_profile_creation(self):
        profile = JobSeekerProfile.objects.create(work_history='Work', skills='Skills', education='Education')
        self.assertIsInstance(profile, JobSeekerProfile)
        self.assertEqual(profile.work_history, 'Work')
        self.assertEqual(profile.skills, 'Skills')
