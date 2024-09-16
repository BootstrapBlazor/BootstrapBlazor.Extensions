// ********************************** 
// Densen Informatica 中讯科技 
// 作者：Alex Chow
// e-mail:zhouchuanglin@gmail.com 
// **********************************

using Azure;
using Azure.AI.FormRecognizer.DocumentAnalysis;
using BootstrapBlazor.OCR;
using BootstrapBlazor.OCR.Services;
using Microsoft.Extensions.Configuration;

namespace BootstrapBlazor.Ocr.Services;

/// <summary>
/// AI Form 表格识别
/// </summary>
public class AiFormService : BaseService<AnalyzedDocument>
{

    /*
     此代码示例显示使用 Azure 表单识别器客户端库进行的预构建收据操作。
     要了解更多信息，请访问文档 - 快速入门：表单识别器 C# 客户端库 SDK
     https://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/quickstarts/try-v3-csharp-sdk
    */


    /*
      完成后请记住从您的代码中删除密钥，并且永远不要公开发布。对于生产，使用
      存储和访问您的凭据的安全方法。有关详细信息，请参阅
    https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-security?tabs=command-line%2Ccsharp#environment-variables-and-application-configuration
    */

    public string Endpoint = "YOUR_FORM_RECOGNIZER_ENDPOINT";

    public string SubscriptionKey = "YOUR_FORM_RECOGNIZER_KEY";

    public AiFormService(IConfiguration? config)
    {
        if (config != null)
        {
            SubscriptionKey = config["AzureCvKey"] ?? "";
            Endpoint = config["AzureCvUrl"] ?? "";
        }
    }

    public AiFormService(string key, string url)
    {
        SubscriptionKey = key;
        Endpoint = url;
    }


    public async Task<List<string>> AnalyzeDocument(string? url = null, Stream? image = null, string modelId = "prebuilt-receipt")
    {
        msg = "AnalyzeDocument start ";
        await GetStatus(msg);

        var credential = new AzureKeyCredential(SubscriptionKey);
        var client = new DocumentAnalysisClient(new Uri(Endpoint), credential);


        AnalyzeDocumentOperation operation;

        if (image != null)
        {
            var ms = await Utils.CopyStream(image);
            operation = await client.AnalyzeDocumentAsync(WaitUntil.Completed, modelId, ms);
        }
        else
        {
            //sample document
            Uri receiptUri = new Uri(url ?? "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png");
            operation = await client.AnalyzeDocumentFromUriAsync(WaitUntil.Completed, modelId, receiptUri);
        }

        AnalyzeResult receipts = operation.Value;

        // To see the list of the supported fields returned by service and its corresponding types, consult:
        // https://aka.ms/formrecognizer/receiptfields

        await GetResult(receipts.Documents.ToList());
        var res = new List<string>();
        foreach (AnalyzedDocument receipt in receipts.Documents)
        {
            if (receipt.Fields.TryGetValue("MerchantName", out DocumentField? merchantNameField))
            {
                if (merchantNameField.FieldType == DocumentFieldType.String)
                {
                    string merchantName = merchantNameField.Value.AsString();

                    msg = $"Merchant Name: '{merchantName}', with confidence {merchantNameField.Confidence}";
                    await GetStatus(msg);
                    res.Add(msg);

                }
            }

            if (receipt.Fields.TryGetValue("TransactionDate", out DocumentField? transactionDateField))
            {
                if (transactionDateField.FieldType == DocumentFieldType.Date)
                {
                    DateTimeOffset transactionDate = transactionDateField.Value.AsDate();

                    msg = $"Transaction Date: '{transactionDate}', with confidence {transactionDateField.Confidence}";
                    await GetStatus(msg);
                    res.Add(msg);

                }
            }

            if (receipt.Fields.TryGetValue("Items", out DocumentField? itemsField))
            {
                if (itemsField.FieldType == DocumentFieldType.List)
                {
                    foreach (DocumentField itemField in itemsField.Value.AsList())
                    {
                        msg = "Item:";
                        await GetStatus(msg);
                        res.Add(msg);

                        if (itemField.FieldType == DocumentFieldType.Dictionary)
                        {
                            IReadOnlyDictionary<string, DocumentField> itemFields = itemField.Value.AsDictionary();

                            if (itemFields.TryGetValue("Description", out DocumentField? itemDescriptionField))
                            {
                                if (itemDescriptionField.FieldType == DocumentFieldType.String)
                                {
                                    string itemDescription = itemDescriptionField.Value.AsString();

                                    msg = $"  Description: '{itemDescription}', with confidence {itemDescriptionField.Confidence}";
                                    await GetStatus(msg);
                                    res.Add(msg);

                                }
                            }

                            if (itemFields.TryGetValue("TotalPrice", out DocumentField? itemTotalPriceField))
                            {
                                if (itemTotalPriceField.FieldType == DocumentFieldType.Double)
                                {
                                    double itemTotalPrice = itemTotalPriceField.Value.AsDouble();

                                    msg = $"  Total Price: '{itemTotalPrice}', with confidence {itemTotalPriceField.Confidence}";
                                    await GetStatus(msg);
                                    res.Add(msg);

                                }
                            }
                        }
                    }
                }
            }

            if (receipt.Fields.TryGetValue("Total", out DocumentField? totalField))
            {
                if (totalField.FieldType == DocumentFieldType.Double)
                {
                    double total = totalField.Value.AsDouble();

                    msg = $"Total: '{total}', with confidence '{totalField.Confidence}'";
                    await GetStatus(msg);
                    res.Add(msg);

                }
            }
        }
        return res;
    }
}

