from django.urls import path
from .views import *
urlpatterns=[
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("invoices/", InvoiceView.as_view(), name="invoices"),
    path("invoices/new/", InvoiceView.as_view(), name="invoices-new"),
    path("invoices/<int:id>/", SpecificInvoice.as_view(), name="specificinvoice"),
    path("invoices/<int:id>/items/", AddItems.as_view(), name="additems"),

]