from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from .models import Job, JobApplication, JobSeekerProfile
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

@method_decorator(csrf_exempt, name='dispatch')
class JobView(View):
    # Existing job methods omitted for brevity

@method_decorator(csrf_exempt, name='dispatch')
class JobApplicationView(View):
    # Existing application methods omitted for brevity

@method_decorator(csrf_exempt, name='dispatch')
class JobSeekerProfileView(View):
    def post(self, request):
        try:
            profile_data = json.loads(request.body)
            profile = JobSeekerProfile.objects.create(
                work_history=profile_data['work_history'],
                skills=profile_data['skills'],
                education=profile_data['education']
            )
            return JsonResponse({'message': 'Profile created successfully', 'seeker_id': profile.seeker_id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def get(self, request, seeker_id):
        try:
            profile = get_object_or_404(JobSeekerProfile, seeker_id=seeker_id)
            return JsonResponse({
                'seeker_id': profile.seeker_id,
                'work_history': profile.work_history,
                'skills': profile.skills,
                'education': profile.education
            }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    def put(self, request, seeker_id):
        try:
            profile = get_object_or_404(JobSeekerProfile, seeker_id=seeker_id)
            update_data = json.loads(request.body)
            profile.work_history = update_data.get('work_history', profile.work_history)
            profile.skills = update_data.get('skills', profile.skills)
            profile.education = update_data.get('education', profile.education)
            profile.save()
            return JsonResponse({'message': 'Profile updated successfully', 'seeker_id': profile.seeker_id}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)