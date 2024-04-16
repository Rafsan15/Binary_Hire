namespace BH.Services.Constants;

public class EmailTemplateConstants
{
    public const string REJECT_TEMPLATE_BODY = "Dear @#userName#@,\n\nThank you for your interest in the @#jobTitle#@ position at @#companyName#@. We appreciate the time and effort you invested in applying and interviewing with us.\n\nAfter careful consideration, we regret to inform you that we have chosen to pursue other candidates whose qualifications more closely align with the requirements of the role.\n\nThank you again for considering @#companyName#@. Should you have any questions or require feedback on your application, please don't hesitate to reach out.\n\nWarm regards,\n[Your Name] \n[Your Position]\n@#companyName#@";
    public const string ACCEPTENCE_TEMPLATE_BODY = "Dear @#userName#@,\n\nI am pleased to inform you that you have been selected for the @#jobTitle#@ position at @#companyName#@. Congratulations on your successful application!\n\nYour qualifications, experience, and enthusiasm for the role stood out among the many applicants we received, and we are confident that you will make a valuable contribution to our team.\n\nWe are excited to welcome you aboard and look forward to working together to achieve our shared goals.\n\nBest regards,\n[Your Name]\n[Your Position]\n@#companyName#@";
    public const string SUBJECT_TEMPLATE = "Application Outcome for @#jobTitle#@ Position";
    
}