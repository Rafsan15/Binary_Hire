--region PROCEDURE [dbo].[SelectFavJobPost]
IF OBJECT_ID('[dbo].[SelectFavJobPost]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectFavJobPost] 
    END 
GO 
     
CREATE PROC [dbo].[SelectFavJobPost] 
( 
	@OrganizationId INT
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
	WHERE JP.OrganizationId=@OrganizationId
	AND JP.IsFav = 1
GO
--endregion

