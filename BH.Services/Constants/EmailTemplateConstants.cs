namespace BH.Services.Constants;

public class EmailTemplateConstants
{
    public const string ACCEPTENCE_TEMPLATE_BODY = "Dear @#userName#@,\n\n \n\nIt was nice to met you in the interview!\n\n \n\nIn discussion with my colleques we\u00b4ve decided to reject your application today. We are sorry for this but we are thinking it doesn\u00b4t matched not so good.\n\n \n\nWe wish you all the best and good luck for your future and your study!\n\n \n\nBest regards!\n\n \n\nNicole\n\n";
    public const string REJECT_TEMPLATE_BODY = "Dear @#userName#@,\n\n \n\nIt was nice to met you in the interview!\n\n \n\nIn discussion with my colleques we\u00b4ve decided to accept your application today. We are very happy for this.\n\n \n\nWe wish you all the best and good luck for our future journey!\n\n \n\nBest regards!\n\n \n\nNicole\n\n";
    public const string SUBJECT_TEMPLATE = "Dummy subject";
}