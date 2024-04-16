--region PROCEDURE [dbo].[SelectAssessmentById]
IF OBJECT_ID('[dbo].[SelectAssessmentById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectAssessmentById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectAssessmentById] 
( 
	@Id INT
)
AS
	SELECT
	[ASM].[Id],
	[ASM].[ResultId],
	[ASM].[QuestionId],
	[Q].[QuestionText],
	[ASM].[Score],
	[ASM].[OrganizationId],
	[ASM].[CreatedBy],
	[ASM].[CreatedDate],
	[ASM].[ModifiedBy],
	[ASM].[ModifiedDate]
	FROM [dbo].[Assessment] AS [ASM]
	INNER JOIN [dbo].[QuestionId] AS [Q] ON [Q].Id=[ASM].QuestionId
	WHERE [ASM].Id=@Id
GO
--endregion

