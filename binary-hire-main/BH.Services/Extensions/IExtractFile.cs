namespace BH.Services.Extensions;

public interface IExtractFile
{
    Dictionary<string, string> Extract(string sharedFolderLink);
    string GetLocalFolderPath();

}