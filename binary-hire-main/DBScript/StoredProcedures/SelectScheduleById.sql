--region PROCEDURE [dbo].[SelectScheduleById]
IF OBJECT_ID('[dbo].[SelectScheduleById]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[SelectScheduleById] 
    END 
GO 
     
CREATE PROC [dbo].[SelectScheduleById] 
( 
	@Id INT
)
AS
	SELECT
	[SC].[Id],
	CONCAT([RS].[Name] , ' ' , [RS].Email) AS [Description],
	[SC].[JobPostId],
	[SC].[ResultId],
	[SC].[OrganizationId],
	[SC].[OnDate],
	[SC].[StartTime],
	[SC].[EndTime],
	[SC].[CreatedBy],
	[SC].[CreatedDate],
	[SC].[ModifiedBy],
	[SC].[ModifiedDate]
	FROM [dbo].[Schedule] AS [SC]
	LEFT JOIN [dbo].[Result] AS [RS] ON [RS].[Id] = [SC].[ResultId]
	WHERE [SC].Id=@Id 
GO
--endregion
