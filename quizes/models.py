from django.db import models
from category.models import Category

# Create your models here.
class Quiz(models.Model):
    name = models.CharField(max_length=120)
    has_time_limit = models.IntegerField(blank = True, null = True)
    description = models.TextField(blank = True, null = True)
    topic = models.ForeignKey(Category, on_delete=models.CASCADE)
    num_of_questions = models.IntegerField()

    def __str__(self):
        return f"{self.name}-{self.topic}"
    

    def get_questions(self):
        return self.question_set.all()[:self.num_of_questions]
    
    class Meta:
        verbose_name_plural = 'Quizes'