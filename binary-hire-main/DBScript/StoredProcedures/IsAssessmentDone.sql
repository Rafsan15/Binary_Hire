--region PROCEDURE [dbo].[IsAssessmentDone]
IF OBJECT_ID('[dbo].[IsAssessmentDone]') IS NOT NULL 
    BEGIN 
        DROP PROC [dbo].[IsAssessmentDone] 
    END 
GO 
     
CREATE PROC [dbo].[IsAssessmentDone] 
( 
	@ResultId INT
)
AS
	SELECT COUNT(*)
	FROM [dbo].[Assessment]
	WHERE ResultId=@ResultId
GO
--endregion

