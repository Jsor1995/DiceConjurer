from django.db import models
from fractions import Fraction

# Create your models here.
class AnimalList(models.Model):
    CR = models.FloatField()
    animal = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f"{self.animal}, CR: {Fraction(self.CR)}"



    


