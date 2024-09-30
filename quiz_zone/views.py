from django.shortcuts import render
from quizes.models import Quiz
from category.models import Category

def home(request, category_slug = None):  
    data = Quiz.objects.all() 
    if category_slug is not None: 
        category = Category.objects.get(slug = category_slug) 
        data = Quiz.objects.filter(topic  = category) 
    categories = Category.objects.all() 
    return render(request, 'home.html', {'data' : data, 'category' : categories})