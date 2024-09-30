from django.shortcuts import render
from .models import Quiz
from django.views.generic import DetailView
from django.http import JsonResponse

# Create your views here.
# class QuizListView(ListView):
#     model = Quiz
#     template_name = 'home.html'


# def quiz_view(request, pk):
#     quiz = Quiz.objects.get(pk=pk)
#     return render(request, 'quizes/detail_quiz.html', {'data': quiz})

class DetailquizView(DetailView):
    model = Quiz
    pk_url_kwarg = 'pk'
    template_name = 'quizes/quiz_details.html'


def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q): answers})
    return JsonResponse({
        'data': questions,
        'time': quiz.has_time_limit,
    })


def save_quiz_view(request, pk):
    print(request.POST)
    return JsonResponse({'text': 'works'})