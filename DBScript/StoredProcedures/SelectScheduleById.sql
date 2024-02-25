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
	[Id],
	[JobPostId],
	[ResultId],
	[OrganizationId],
	[OnDate],
	[StartTime],
	[EndTime],
	[CreatedBy],
	[CreatedDate],
	[ModifiedBy],
	[ModifiedDate]
	FROM [dbo].[Schedule]
	WHERE Id=@Id
GO
--endregion

