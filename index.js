
const {
EssentialContactsServiceClient,
} = require('@google-cloud/essential-contacts').v1;
const {AuthClient} = require('google-auth-library');
// Create client
var client = new AuthClient({credentials: {}});

var essentialContactsServiceClient = EssentialContactsServiceClient.Create();
// Initialize request argument(s)
var request = new EssentialContactsServiceClient({auth: {

}})
.ListContactsRequest({
    ParentAsProjectName: ProjectName.FromProject("[PROJECT]"),
});
// Make the request
var response = essentialContactsServiceClient.ListContacts(request);

console.log(response);

// Or iterate over pages (of server-defined size), performing one RPC per page
foreach (page in response.AsRawResponses())
{
    // Do something with each page of items
    Console.WriteLine("A page of results:");
    foreach (item in page)
    {
        // Do something with each item
        Console.WriteLine(item);
    }
}

// Or retrieve a single page of known size (unless it's the final page), performing as many RPCs as required
var pageSize = 10;
var singlePage = response.ReadPage(pageSize);
// Do something with the page of items
// Console.WriteLine($"A page of {pageSize} results (unless it's the final page):");
foreach (item in singlePage)
{
    // Do something with each item
    Console.WriteLine(item);
}
// Store the pageToken, for when the next page is required.
var nextPageToken = singlePage.NextPageToken;
