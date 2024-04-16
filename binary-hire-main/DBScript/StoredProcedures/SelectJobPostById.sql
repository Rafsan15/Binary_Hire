--region PROCEDURE [dbo].[SelectJobPostById]
IF OBJECT_ID('[dbo].[SelectJobPostById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectJobPostById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectJobPostById] 
( 
	@Id INT
)
AS
	SELECT
	JP.[Id],
	JP.[Title],
	JP.[Description],
	JP.[JobType],
	S_JobType.[DisplayText] AS [JobTypeName],
	JP.[MinExperience],
	JP.[MaxExperience],
	JP.[Location],
	JP.[Education],
	JP.[Skills],
	JP.[WorkPlace],
	S_WorkPlace.[DisplayText] AS [WorkPlaceName],
	JP.[IsFav],
	JP.[Note],
	JP.[IsDeleted],
	JP.[Status],
	S_Status.[DisplayText] AS [StatusName],
	JP.[OrganizationId],
	JP.[CreatedBy],
	JP.[CreatedDate],
	JP.[ModifiedBy],
	JP.[ModifiedDate]
	FROM [dbo].[JobPost] AS JP
	LEFT JOIN [dbo].[Setting] AS S_JobType ON S_JobType.Id = JP.JobType
	LEFT JOIN [dbo].[Setting] AS S_WorkPlace ON S_WorkPlace.Id = JP.WorkPlace
	LEFT JOIN [dbo].[Setting] AS S_Status ON S_Status.Id = JP.Status
	WHERE JP.Id=@Id
GO
--endregion

